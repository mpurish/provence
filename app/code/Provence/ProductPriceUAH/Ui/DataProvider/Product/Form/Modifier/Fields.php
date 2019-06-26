<?php

namespace Provence\ProductPriceUAH\Ui\DataProvider\Product\Form\Modifier;

use Magento\Catalog\Ui\DataProvider\Product\Form\Modifier\AbstractModifier;
use Magento\Ui\Component\Form\Fieldset;
use Magento\Ui\Component\Form\Field;
use Magento\Ui\Component\Form\Element\Input;
use Magento\Ui\Component\Form\Element\DataType\Text;
use Magento\Store\Model\StoreManagerInterface;

class Fields extends AbstractModifier
{
//    public function modifyMeta(array $meta)
//    {
//        return $meta;
//    }

    public function modifyData(array $data)
    {
//        $data[1]["product"]["price"]
//        var_dump($data);
        return $data;
    }

    public function modifyMeta(array $meta)
    {
        $meta = array_replace_recursive(
            $meta,
            [
                'provence' => [
                    'arguments' => [
                        'data' => [
                            'config' => [
                                'label' => __('Currency Rate'),
                                'collapsible' => false,
                                'componentType' => Fieldset::NAME,
                                'dataScope' => 'data.provence',
                                'sortOrder' => 1000
                            ],
                        ],
                    ],
                    'children' => $this->getFields()
                ],
            ]
        );

        return $meta;
    }

    /**
     * @var \Magento\Store\Model\StoreManagerInterface
     */
    protected $storeManager;

    /**
     * @var \Magento\Directory\Model\CurrencyFactory
     */
    protected $currencyFactory;

    /**
     * @param \Magento\Store\Model\StoreManagerInterface $storeManager
     * @param \Magento\Directory\Model\CurrencyFactory $currencyFactory
     */
    public function __construct(
        \Magento\Store\Model\StoreManagerInterface $storeManager,
        \Magento\Directory\Model\CurrencyFactory $currencyFactory
    ) {
        $this->storeManager = $storeManager;
        $this->currencyFactory = $currencyFactory;
    }

    protected function getFields()
    {
        $rate = $this->storeManager->getStore()->getBaseCurrency()->getRate('UAH');

        return [
            'textField' => [
                'arguments' => [
                    'data' => [
                        'config' => [
                            'label'         => __('UAH Exchange Rate'),
                            'componentType' => Field::NAME,
                            'formElement'   => Input::NAME,
                            'dataScope'     => 'currencyrate',
                            'dataType'      => Text::NAME,
                            'sortOrder'     => 20,
                            'value'         => $rate,
                            'disabled'      => true
                        ],
                    ],
                ],
            ]
        ];
    }
}