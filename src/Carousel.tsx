import { Component, MouseEvent } from 'react';

interface Props {
  images: string[];
}

interface State {
  active: number;
}

export default class Carousel extends Component<Props, State> {
  state = {
    active: 0
  };

  static defaultProps = {
    images: ['http://pets-images.dev-apis.com/pets/none.jpg']
  };

  handleIndexClick = (event: MouseEvent<HTMLElement>) => {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }
    if (event.target.dataset.index) {
      this.setState({
        active: +event.target.dataset.index
      });
    }
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;

    return (
      <div className="carousel">
        <img src={images[active]} alt="Animal Here" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            <img
              onClick={this.handleIndexClick}
              data-index={index}
              key={photo}
              src={photo}
              className={index === active ? 'active' : ''}
              alt="Animal Thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}
