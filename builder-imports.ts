import { Builder } from '@builder.io/react'
// Be sure to import all of your components where you use <BuilderComponent /> so they are
// bundled and accessible
import './components/Button/Button.builder';
import './components/CustomColumns/CustomColumns.builder';
import './components/DoubleColumns/DoubleColumns.builder';
import './components/DynamicColumns/DynamicColumns.builder';
import './components/Heading/Heading.builder';
import './components/Hero/Hero.builder';
import './components/HeroWithChildren/HeroWithChildren.builder';
import './components/ProductsList/ProductsList.builder';
import './components/TripleColumns/TripleColumns.builder';
import './components/Cloudinary/Cloudinary.builder.tsx';

// new imports
import './components/ProductView/ProductView.builder';
import './components/ProductGrid/ProductGrid.builder';

Builder.register('insertMenu', {
  name: 'Shopify Specifics',
  items: [
    { name: 'ProductBox' },
    { name: 'ProductGrid' },
    { name: 'ProductCollectionGrid' },
  ],
})