declare module 'react-modal-image' {
  import { Component } from 'react';

  interface ModalImageProps {
    small: string;
    large: string;
    alt: string;
    className?: string;
  }

  export default class ModalImage extends Component<ModalImageProps> {}
}
