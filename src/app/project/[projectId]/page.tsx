/* eslint-disable max-len */
import { redirect } from "next/navigation";
import WiiButton from "@/components/WiiButton";
import HandleStartSounds from "@/components/HandleStartSounds";
import { createClient } from "@/prismicio";
import { PrismicRichText } from "@prismicio/react";
// import { PrismicNextImage } from "@prismicio/next";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ImageCarousel from "@/components/ImageCarousel";
import { PrismicNextLink } from "@prismicio/next";

type Params = { projectId: string };

// const projects = [
//   {
//     id: 1,
//     src: "https://wyjsnkrgktfutfwyycwx.supabase.co/storage/v1/object/public/application/frogy/f293406b49457d032e080e035f5d680d.webp",
//     title: "Frogy",
//     folder: "frogy",
//     tags: [
//       "ChatGPT API",
//       "Python",
//       "Dart",
//       "Flutter",
//       "QML",
//       "RASPBERRY",
//       "GITHUB",
//       "WEBSOCKET",
//     ],
//     type: "Application mobile + application GUI",
//     description: `Durant ma première année à l'école des Gobelins à Annecy, j'ai pu réaliser un projet de création d'objet connecté en équipe de trois,accompagné de deux designers. \n Cet objet avait pour but d'aider les personnes cérébrolésées à réduire leur gaspillage alimentaire. Le développement de ce projet s'est déroulé en deux parties. \n `,
//     backgroundColor: "#2E5245",
//     tagColor: "#50E28B",
//   },
//   {
//     id: 2,
//     src: "https://www.mathis-viollet.fr/_next/image?url=https%3A%2F%2Fwyjsnkrgktfutfwyycwx.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fapplication%2Fstarclean%2Fcover_starclean_3b770cb2cb.webp&w=640&q=75",
//     title: "Starclean",
//     folder: "starclean",
//     tags: [
//       "THREE.JS",
//       "CESIUM",
//       "HTML",
//       "CSS",
//       "JAVASCRIPT",
//       "FIGMA",
//       "NODE.JS",
//     ],
//     type: "Site web",
//     description: `Au cours de ma première année à l'École des Gobelins, j'ai collaboré avec deux designers pour concevoir un site de visualisation de données sur les débris spatiaux, aligné sur le thème "prendre de la hauteur". \n J'ai principalement géré le développement du site sans recourir à un Framework, l'intégration de la 3D grâce à l'outil césium, et la collecte de données fiables à partir de l'API de space-track. \n Ce projet a été pour moi un défi stimulant au niveau technique et créatif, grâce à l'apport unique des designers avec qui j'ai travaillé. En résultat, nous avons présenté un site accessible à tous les âges avec une approche ludique et mature de notre sujet.    `,
//   },
//   {
//     id: 3,
//     src: "https://www.mathis-viollet.fr/_next/image?url=https%3A%2F%2Fwyjsnkrgktfutfwyycwx.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fapplication%2Ffnac%2Fcover_fnac.webp&w=640&q=75",
//     title: "Fnac",
//     folder: "fnac",
//     tags: [
//       "HTML",
//       "CSS",
//       "JAVASCRIPT",
//       "LARAVEL",
//       "GITHUB",
//       "SQL",
//       "PHP",
//       "MÉTHODE AGILE",
//     ],
//     type: "Site web",
//     description: `Dans le cadre de ce projet en équipe de 5, nous avons cherché à reproduire le site de la FNAC en utilisant le Framework Laravel et une base de données exhaustive. Nous avons employé la méthode agile/scrum, divisant les tâches en sprints pour optimiser notre travail.  \n J'ai apprécié cette approche qui nous permettait de partager les responsabilités et de suivre l'évolution des autres membres de l'équipe. Recréer le design du site de la FNAC nous a incités à examiner en détail son fonctionnement et à perfectionner nos compétences tout en produisant un résultat esthétique, même si cela limitait notre créativité. \n J'ai contribué à la fois au frontend et au backend du projet, travaillant sur des éléments tels que la création d'un header adaptatif, l'affichage des produits et des détails de la base de données, ainsi que la gestion des utilisateurs et de leurs données. Pour le développement, nous avons utilisé le Framework Laravel sous Visual Studio Code, complété par HTML, CSS et JavaScript pour l'apparence et la dynamique du site.`,
//   },
// ];

export default async function Project({
  params,
}: {
  params: { projectId: string };
}) {
  const client = createClient();
  const page = await client
    .getByUID("project_page", params.projectId)
    .catch(() => redirect("/"));

  return (
    <main
      style={{ backgroundColor: page.data.background_color ?? "#ffffff" }}
      className="transition-all h-screen fixed w-screen overflow-x-hidden flex flex-col xl:flex-row-reverse bg-gray-200"
    >
      <HandleStartSounds
        sound={{
          soundPath: `${page.data.sound_folder_name}/backgroundMusic.mp3`,
          loop: false,
          volume: 0.2,
        }}
      />
      <div
        style={{ color: page.data.main_color ?? "#000000" }}
        className="fade-in-right flex flex-col pt-20 px-16 xl:px-32 basis-3/5 text-gray-700"
      >
        <p className="text-xl font-light py-4">{page.data.project_type}</p>
        <h1 className="text-4xl font-bold uppercase pb-5">
          {page.data.project_name}
        </h1>
        <div className="project-description text-lg md:text-xl xl:text-2xl font-normal pb-16">
          <PrismicRichText field={page.data.description} />
        </div>
      </div>
      <div className="fade-in-left flex flex-col gap-4 py-20 px-16 lg:px-24 xl:px-24 h-full basis-2/5">
        <ImageCarousel images={page.data.images} />
        <div
          className="flex flex-col gap-4 underline uppercase text-lg font-bold py-2 italic"
          style={{ color: page.data.main_color ?? "#000000" }}
        >
          {page.data.links_group.map((item, index) => (
            <PrismicNextLink field={item.link} key={index}>
              {item.link_display_text}
            </PrismicNextLink>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 py-10">
          {page.data.tags.map((item, index) => (
            <div
              key={index}
              style={{
                backgroundColor: page.data.main_color ?? "#000000",
                color: page.data.background_color ?? "#ffffff",
              }}
              className="px-4 py-2 flex-auto max-w-44 flex items-center justify-center bg-gray-700 text-gray-200"
            >
              <p className="uppercase font-bold">{item.project_tag}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="fixed transition-all bottom-10 left-10 lg:left-20 z-10 hover:opacity-100">
        <WiiButton
          text="Back"
          className="min-w-44 md:min-w-64"
          link={`/preview/${page.uid}`}
        />
      </div>
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID("project_page", params.projectId)
    .catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}
