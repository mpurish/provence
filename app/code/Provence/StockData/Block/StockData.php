<?php
namespace Provence\StockData\Block;
class StockData extends \Magento\Catalog\Block\Product\View
{
    protected $_stockRegistry;
    public function __construct(\Magento\CatalogInventory\Api\StockRegistryInterface $stockRegistry)
    {
        $this->_stockRegistry = $stockRegistry;
    }
    public function getStockItem($productId)
    {
        return $this->_stockRegistry->getStockItem($productId);
    }
}
?>