import { defineType } from "sanity";
import CarouselPreview from "../previews/CarouselPreview";

export default defineType({
  name: 'bodyCarousel',
  title: 'Body Carousel',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'carousel',
      title: 'Carousel ',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          }
        }
      ]
    }
  ],
  components:{
    preview: CarouselPreview,
  },
  preview: {
    select: {
      title: 'title',
      description: 'description',
      carousel: 'carousel'
    }
  }
})