import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './Banner.module.css';

export default class AutoPlayMethods extends Component {
  constructor(props) {
    super(props);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
  }
  play() {
    this.slider.slickPlay();
  }
  pause() {
    this.slider.slickPause();
  }
  render() {
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: false,
      cssEase: 'liner',
    };
    return (
      <div>
        <Slider ref={(slider) => (this.slider = slider)} {...settings}>
          <div>
            <div className={styles.image}></div>
          </div>
          <div>
            <div className={styles.image2}></div>
          </div>
          <div>
            <div className={styles.image3}></div>
          </div>
        </Slider>
      </div>
    );
  }
}
