import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomePage />;
}

function HomePage() {
  const t = useTranslations("landing");

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-8 px-16 py-32">
        <h1 className="max-w-lg text-center text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50">
          {t("heroTitle")}
        </h1>
        <p className="max-w-md text-center text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          {t("heroSubtitle")}
        </p>
        <div className="flex gap-4">
          <a
            href="#"
            className="flex h-12 items-center justify-center rounded-full bg-foreground px-6 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
          >
            {t("exploreCompanies")}
          </a>
          <a
            href="#"
            className="flex h-12 items-center justify-center rounded-full border border-solid border-black/[.08] px-6 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
          >
            {t("imACompany")}
          </a>
        </div>
      </main>
    </div>
  );
}
