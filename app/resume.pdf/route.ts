import { resume, siteIdentity } from '@/data/content'

const ascii = (value: string) => value.normalize('NFKD').replace(/[^\x20-\x7E]/g, '-').replace(/([\\()])/g, '\\$1')

export function GET() {
  const lines = [
    siteIdentity.name.toUpperCase(),
    resume.headline,
    resume.summary,
    '',
    'EXPERIENCE',
    ...resume.experience.flatMap((entry) => [`${entry.role} - ${entry.company}`, `${entry.period} - ${entry.location}`, entry.summary, ...entry.highlights.map((item) => `- ${item}`), '']),
    'EDUCATION',
    ...resume.education.map((entry) => `${entry.qualification} - ${entry.school} - ${entry.period}`),
    '',
    `CORE SKILLS: ${resume.coreSkills.join(' / ')}`,
    `TOOLS: ${resume.tools.join(' / ')}`,
  ].map(ascii)

  const commands = lines.map((line, index) => `BT /F1 ${index === 0 ? 18 : 10} Tf 54 ${760 - index * 22} Td (${line.slice(0, 105)}) Tj ET`).join('\n')
  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>',
    `<< /Length ${Buffer.byteLength(commands)} >>\nstream\n${commands}\nendstream`,
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
  ]
  let pdf = '%PDF-1.4\n'
  const offsets = [0]
  objects.forEach((object, index) => { offsets.push(Buffer.byteLength(pdf)); pdf += `${index + 1} 0 obj\n${object}\nendobj\n` })
  const xref = Buffer.byteLength(pdf)
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n${offsets.slice(1).map((offset) => `${String(offset).padStart(10, '0')} 00000 n `).join('\n')}\ntrailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`

  return new Response(new Uint8Array(Buffer.from(pdf)), { headers: { 'Content-Type': 'application/pdf', 'Content-Disposition': 'attachment; filename="Khadijat-Bakare-Resume.pdf"' } })
}
