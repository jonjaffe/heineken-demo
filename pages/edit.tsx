import React from 'react';
import { useEffect, useState } from 'react';
import { BuilderComponent, Builder } from '@builder.io/react'


// loading widgets dynamically to reduce bundle size, will only be included in bundle when is used in the content
import '@builder.io/widgets/dist/lib/builder-widgets-async'


export function EditPage() {

  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  });

  if (!isBrowser) {
    return null;
  }

  if (!Builder.isPreviewing) {
    return null;
  }


  return (


      <BuilderComponent
        model={'symbol'}
      />

  );
}

export default EditPage;