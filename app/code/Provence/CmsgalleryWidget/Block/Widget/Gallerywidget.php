<?php
namespace Provence\CmsgalleryWidget\Block\Widget;
use Magento\Framework\View\Element\Template;
use Magento\Widget\Block\BlockInterface;
class Gallerywidget extends Template implements BlockInterface
{
    protected $_template = "widget/gallerywidget.phtml";

    protected $_filesystem;
    protected $_imageFactory;
//    public function __construct(
//        \Magento\Framework\Filesystem $filesystem,
//        \Magento\Framework\Image\AdapterFactory $imageFactory
//    ) {
//        $this->_filesystem = $filesystem;
//        $this->_imageFactory = $imageFactory;
//    }

    // pass imagename, width and height
    public function resize($image, $width = null, $height = null)
    {
        $absolutePath = $this->_filesystem->getDirectoryRead(\Magento\Framework\App\Filesystem\DirectoryList::MEDIA)->getAbsolutePath('test1/').$image;
        if (!file_exists($absolutePath)) return false;
        $imageResized = $this->_filesystem->getDirectoryRead(\Magento\Framework\App\Filesystem\DirectoryList::MEDIA)->getAbsolutePath('resized/'.$width.'/').$image;
        if (!file_exists($imageResized)) { // Only resize image if not already exists.
            //create image factory...
            $imageResize = $this->_imageFactory->create();
            $imageResize->open($absolutePath);
            $imageResize->constrainOnly(TRUE);
            $imageResize->keepTransparency(TRUE);
            $imageResize->keepFrame(FALSE);
            $imageResize->keepAspectRatio(TRUE);
            $imageResize->resize($width,$height);
            //destination folder
            $destination = $imageResized ;
            //save image
            $imageResize->save($destination);
        }
        $resizedURL = $this->_storeManager->getStore()->getBaseUrl(\Magento\Framework\UrlInterface::URL_TYPE_MEDIA).'resized/'.$width.'/'.$image;
        return $resizedURL;
    }
}