import Invitation from "@/modules/invitation";

export const metadata = {
  title: "Acompáñanos a celebrar la llegada de nuestro bebé",
  icons: {
    icon: "/pato.png",
  },
  openGraph: {
    title: "Invitación",
    description: "¡Te invito a mi evento!",
    type: "website",
    images: [
      {
        url: "https://invitagil.com/preview.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};
function Invitations() {
  return <Invitation />;
}

export default Invitations;
