import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../../css/HomeCss.css';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

class CropModal extends React.Component {

    constructor(props) {
        super(props);

        this.canvas = {};

        this.state = {
            crop: {
                unit: '%',
                width: 30,
                aspect: null,
              },
            zoom: 1,
            aspect: null,
            src: null,
            show: true,
            croppedAreaPixels: 0,
            cropData: null,
            cropper: null,
            croppedImageUrl: null
        };

        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        let crop = {
            unit: '%',
            width: 30,
            aspect: this.props.aspect
        };
        this.setState({
            crop,
            src: this.props.imgSrc
        });

        console.log(this.props);
    }

    onImageLoaded = image => {
        this.imageRef = image;
      };

      onCropComplete = crop => {
        this.makeClientCrop(crop);
      };

      onCropChange = (crop, percentCrop) => {
            this.setState({ crop });
        };

        async makeClientCrop(crop) {
            if (this.imageRef && crop.width && crop.height) {
              // blob url is coming into croppedImageUrl
              // use this for cropped image
              const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                crop,
                'newFile.jpg'
              );
              this.setState({ croppedImageUrl });
            }
          }
        
          getCroppedImg(image, crop, fileName) {
            const canvas = document.createElement('canvas');
            const scaleX = image.naturalWidth / image.width;
            const scaleY = image.naturalHeight / image.height;
            const ctx = canvas.getContext('2d');
            canvas.width = crop.width;
            canvas.height = crop.height;
            
            ctx.drawImage(
              image,
              crop.x * scaleX,
              crop.y * scaleY,
              crop.width * scaleX,
              crop.height * scaleY,
              0,
              0,
              crop.width,
              crop.height
            );
            // to get base64 url
            const base64Image = canvas.toDataURL('image/jpeg');
            return new Promise((resolve, reject) => {
              canvas.toBlob(blob => {
                if (!blob) {
                  console.error('Canvas is empty');
                  return;
                }
                blob.name = fileName;

                window.URL.revokeObjectURL(this.fileUrl);
                this.fileUrl = window.URL.createObjectURL(blob);
                console.log(this.props.type, 'generated base64 url');
                resolve(base64Image);
              }, 'image/jpeg');
            });
          }

      handleClose(e) {
        this.setState({
            show: false
        });
        let data = {
            pixels: this.state.croppedAreaPixels,
            image: this.state.croppedImageUrl,
            type: this.props.type
        }
        this.props.onClose(data);
      }

    render() {
        const { src, crop, croppedImageUrl } = this.state;
        return (
            <div>
                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={true}
                >
                    <Modal.Header>
                        <Modal.Title>Crop Image</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {src && (
                            <ReactCrop
                                src={src}
                                crop={crop}
                                ruleOfThirds
                                onImageLoaded={this.onImageLoaded}
                                onComplete={this.onCropComplete}
                                onChange={this.onCropChange}
                            />
                        )}
                        {/* {croppedImageUrl && (
                            <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />
                        )} */}
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="primary" onClick={this.handleClose}>
                          Done
                      </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );  
    }
}

export default CropModal;