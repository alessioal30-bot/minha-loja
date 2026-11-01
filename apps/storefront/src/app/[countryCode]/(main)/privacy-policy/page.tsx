import { Metadata } from "next"
import policy from "@lib/privacy-policy.json"

export const metadata: Metadata = {
  title: "Política de Privacidade | AM Suplementos e Vestuário",
  description: "Saiba como a AM Suplementos e Vestuário utiliza dados pessoais e como exercer seus direitos de privacidade.",
}

export default function PrivacyPolicyPage() {
  return (
    <article className="content-container py-12 max-w-4xl" lang="pt-BR">
      <h1 className="text-3xl font-semibold mb-3">{policy.title}</h1>
      <p className="text-sm text-gray-600 mb-6">Última atualização: {policy.updated}</p>
      <p className="text-base leading-7 mb-8">{policy.intro}</p>
      <a className="underline break-words" href={`mailto:${policy.email}`}>{policy.email}</a>
      {policy.sections.map((section) => (
        <section key={section.title} className="mt-8">
          <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-base leading-7 mb-4">{paragraph}</p>
          ))}
          {"items" in section && section.items && (
            <ul className="list-disc pl-6 space-y-3 text-base leading-7">
              {section.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          )}
        </section>
      ))}
    </article>
  )
}
