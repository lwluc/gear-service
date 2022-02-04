package com.gearservice.model.cheque.samples;

/**
 * Enum Products contains samples of products
 *
 * @version 1.0
 * @author Dmitry
 * @since 04.09.2015
 */
public enum Products {
    product1("Notebook"),
    product2("Elektronik");

    private final String product;
    Products(String s) {product = s;}
    public boolean equalsName(String otherProduct) {return (otherProduct != null) && product.equals(otherProduct);}
    public String toString() {return this.product;}
}
