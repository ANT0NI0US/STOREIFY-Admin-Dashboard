import PageHead from "@/ui/PageHead";
import useHelmet from "@/hooks/useHelmet";
import ContactForm from "@/components/contact/ContactForm";

export default function Contact() {
  useHelmet("Contact");
  return (
    <>
      <PageHead headText="Contact" />
      <ContactForm />
    </>
  );
}
