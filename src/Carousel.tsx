/* eslint-disable jsx-a11y/click-events-have-key-events */
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
      <div className="flex flex-col pr-6">
        <img
          className="basis-full"
          data-testid="hero"
          src={images[active]}
          alt="Animal Here"
        />
        <div className="flex flex-row w-20 pt-8">
          {images.map((photo, index) => (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <img
              onClick={this.handleIndexClick}
              data-index={index}
              key={photo}
              src={photo}
              data-testid={`thumbnail${index}`}
              className={
                index === active ? 'active basis-1/4 p-2' : 'basis-1/4 p-2'
              }
              alt="Animal Thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}
