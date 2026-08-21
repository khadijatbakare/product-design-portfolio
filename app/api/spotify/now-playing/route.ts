import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface SpotifyNowPlaying {
  readonly is_playing: boolean;
  readonly item: null | {
    readonly name: string;
    readonly type: "track" | "episode";
    readonly artists?: readonly { readonly name: string }[];
    readonly album?: {
      readonly images: readonly { readonly url: string }[];
    };
    readonly show?: { readonly name: string };
    readonly external_urls: { readonly spotify: string };
  };
}

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return NextResponse.json({ isPlaying: false }, { status: 503 });
  }

  try {
    const tokenResponse = await fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        }),
        cache: "no-store",
      },
    );

    if (!tokenResponse.ok) {
      return NextResponse.json({ isPlaying: false }, { status: 502 });
    }

    const token = (await tokenResponse.json()) as { access_token: string };
    const playerResponse = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing?additional_types=track,episode",
      {
        headers: { Authorization: `Bearer ${token.access_token}` },
        cache: "no-store",
      },
    );

    if (playerResponse.status === 204) {
      return NextResponse.json({ isPlaying: false });
    }
    if (!playerResponse.ok) {
      return NextResponse.json({ isPlaying: false }, { status: 502 });
    }

    const player = (await playerResponse.json()) as SpotifyNowPlaying;
    if (!player.item) return NextResponse.json({ isPlaying: false });

    const artist =
      player.item.type === "episode"
        ? (player.item.show?.name ?? "Spotify podcast")
        : (player.item.artists?.map((item) => item.name).join(", ") ??
          "Spotify");

    return NextResponse.json(
      {
        isPlaying: player.is_playing,
        track: player.item.name,
        artist,
        albumArt: player.item.album?.images[0]?.url,
        spotifyUrl: player.item.external_urls.spotify,
      },
      { headers: { "Cache-Control": "private, no-store" } },
    );
  } catch {
    return NextResponse.json({ isPlaying: false }, { status: 502 });
  }
}
