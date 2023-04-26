import React from 'react';
import { Builder, builder, BuilderComponent } from '@builder.io/react';
import { GetStaticProps } from 'next';
import builderConfig from '@config/builder'

builder.init(builderConfig.apiKey)

function Content({ builderPage }: any) {

   
    return (
      <>

                {builderPage || Builder.isEditing || Builder.isPreviewing ? (
                  <BuilderComponent
                    name="story-page"
                    content={builderPage}
                  />
                ) : (
                  <>
                    <h3>Product not found!</h3>
                  </>
                )}
      </>
    );
  }
  
  export const getStaticPaths = async () => {
    const results = await builder.getAll('story-page', {
      key: 'story-page:all',
      fields: 'data.url',
      limit: 200,
      options: {
        noTargeting: true,
      },
    });
  
    const paths = results
      .filter(
        (item) =>
          item.data?.url?.startsWith('/content/'),
      )
      .map((item) => ({
        params: {
          content: (item.data?.url?.replace('/content/', '') || '').split('/'),
        },
      }));
  
    return {
      paths,
      fallback: 'blocking' as const,
    };
  };
  
  export const getStaticProps: GetStaticProps = async (context) => {
    // Don't target on url and device for better cache efficiency
    const targeting = { urlPath: '_', device: '_' } as any;
    const path = `/content/${(context.params?.content as string[])?.join('/') || ''}`;
  
    const [page] = await Promise.all([
        builder
          .get('story-page', {
            userAttributes: { ...targeting, urlPath: path }
          })
          .promise()
      ])
    ;


  
    // If there is a Builder page for this URL, this will be an object, otherwise it'll be null
    return {
      revalidate: 1,
      props: { builderPage: page || null },
    };
  };
  
  export default Content;


