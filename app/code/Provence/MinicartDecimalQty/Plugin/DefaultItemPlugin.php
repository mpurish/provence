<?php

namespace Provence\MinicartDecimalQty\Plugin;

class DefaultItemPlugin
{

    public function afterGetItemData(
        \Magento\Checkout\CustomerData\AbstractItem $subject,
        $result,
        \Magento\Quote\Model\Quote\Item $item)
    {
        $data['decimalQty'] = $item->getProduct()->getExtensionAttributes()->getStockItem()->getIsQtyDecimal();

        return \array_merge(
            $result,
            $data
        );
    }

}