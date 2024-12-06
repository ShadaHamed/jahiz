import { useTranslation } from "next-i18next";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("welcome")}</h1>

      <p>
        <a href="/">{t("home")}</a>
      </p>

      <p>
        <a href="/about">{t("about")}</a>
      </p>
    </div>
  );
};

export default Home;
