<?php
namespace Provence\RoomConstructor\Block;
class RoomConstructor extends \Magento\Framework\View\Element\Template
{
    protected $_productCollectionFactory;
    protected $_imageBuilder;

    public function __construct(
        \Magento\Backend\Block\Template\Context $context,
        \Magento\Catalog\Model\ResourceModel\Product\CollectionFactory $productCollectionFactory,
        \Magento\Catalog\Block\Product\ImageBuilder $_imageBuilder,
        array $data = []
    )
    {
        $this->_productCollectionFactory = $productCollectionFactory;
        $this->_imageBuilder = $_imageBuilder;
        $this->_storeManager = $context->getStoreManager();
        parent::__construct($context, $data);
    }

    public function getProductCollection()
    {
        $collection = $this->_productCollectionFactory->create();
//        $collection->addAttributeToSelect(['*'])->addAttributeToFilter('room_constructor', array('neq' => ''));
        $collection->addAttributeToSelect(['name', 'sku', 'swatch_image', 'room_constructor'])->addAttributeToFilter('room_constructor', array('neq' => ''));
//        $collection->setPageSize(5); // fetching only 3 products
        return $collection;
    }

    public function getImage($product, $imageId, $attributes = [])
    {
        return $this->_imageBuilder->setProduct($product)
            ->setImageId($imageId)
            ->setAttributes($attributes)
            ->create();
    }

    public function getMediaBaseUrl() {

//        $om = \Magento\Framework\App\ObjectManager::getInstance();

//        $storeManager = $om->get('Magento\Store\Model\StoreManagerInterface');

        $currentStore = $this->_storeManager->getStore();
        return $currentStore->getBaseUrl(\Magento\Framework\UrlInterface::URL_TYPE_MEDIA);
    }
}
?>