import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="container text-center">
        <code className="relative my-3 rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          @radix-ui/react-alert-dialog
        </code>
        <h1 className="scroll-m-20 py-3 text-4xl font-extrabold tracking-tight lg:text-8xl">
          {t("title")}
        </h1>
        <p className="py-3 text-xl text-muted-foreground lg:text-3xl">
          A modal dialog that interrupts the user with important content and
          expects a response.
        </p>
      </div>
    </>
  );
};

export default Hero;
