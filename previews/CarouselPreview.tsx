
import {Flex, Text} from '@sanity/ui'
import {Image, PreviewProps} from 'sanity'
import { ImagePreview } from './ImagePreview'

type CarouselPreviewProps = PreviewProps & {
    title?: string
    description?: string
    carousel?: Array<Image>
  }

export default function CarouselPreview(props: PreviewProps) {
    const carouselProps = props as CarouselPreviewProps
    const { title, description, carousel } = carouselProps
    return (
        <Flex align="flex-start" direction={'column'}>
            {/* Customize the subtitle for the built-in preview */}
            {/* <Box flex={1} width={'100%'} >{props.renderDefault({...props})}</Box> */}
            <Text style={{ fontWeight: 'bold', marginLeft: 8, marginTop: 8}} >{title}</Text>
            <Text style={{ fontWeight: 'light', marginLeft: 8, marginTop: 16, fontSize: 12}}>{description}</Text>
            {/* List of images */}
            <div style={{ display: 'flex', width: '100%', flexDirection: 'row', overflowX: 'scroll', marginTop: 16 }}>
                {carousel && carousel.length > 0 ? (
                    carousel.map( (item, index) => 
                        <ImagePreview key={`${index}`} image={item} />
                    )
                ) : null }
            </div>
        </Flex>
    )
}

