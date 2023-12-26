import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import {Autoplay, EffectFade} from 'swiper/modules'
import 'swiper/css/effect-fade';

const slider = {
    width : '500px',
    height: '600px',
}

function CategorySlider({imgs}) {
    console.log(imgs)
    return (
        <>
            <Swiper
                style={slider}
                slidesPerView={1}
                loop={true}
                autoplay={{delay : 2000}}
                speed ={3000}
                modules={[Autoplay, EffectFade]}
                effect = {'fade'}
            >
                {imgs.map((img,index)=>(
                    <SwiperSlide key={index}>
                        <img src={img}/>
                    </SwiperSlide>
                ))}
            </Swiper>

        </>
    )
}

export default CategorySlider
