/** Formata datas de calendário do frontmatter (YYYY-MM-DD) para exibição. */
export function formatPostDate(iso: string): string {
  // timeZone UTC: a data é meia-noite UTC; sem isto, fusos negativos exibiriam o dia anterior.
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(new Date(iso))
}
