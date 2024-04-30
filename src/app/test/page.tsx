"use client";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [sid, setSid] = useState([]);

  const fetchPhotos = async () => {
    const res = await fetch("/api/predictions");
    const data = await res.json();
    setPhotos(data.allPhotos);
    setSid(data.MessageSid);
  };

  return (
    <div className="container max-w-2xl mx-auto p-5">
      <Head>
        <title>AI Photos</title>
      </Head>

      <h1 className="py-6 text-center font-bold text-2xl">
        Click to generate photos
      </h1>

      <div className="w-full flex">
        <button className="button" onClick={() => fetchPhotos()}>
          Generate photos
        </button>
      </div>

      {photos.map((photo, index) => (
        <div key={index}>
          {photo && (
            <div className="image-wrapper mt-5">
              <Image fill src={photo} alt={`photo-${index}`} sizes="100vw" />
            </div>
          )}
        </div>
      ))}
      <span>Sid: {sid}</span>
    </div>
  );
}
