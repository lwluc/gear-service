package com.gearservice.model.cheque.samples;

/**
 * Enum Models contains samples of models
 *
 * @version 1.0
 * @author Dmitry
 * @since 04.09.2015
 */
public enum Models {
    model1("Asus.T100TA-DK003H"),
    model2("Apple.MacBook Pro MGXA2");


    private final String model;
    Models(String s) {model = s;}
    public boolean equalsName(String otherModel) {return (otherModel != null) && model.equals(otherModel);}
    public String toString() {return this.model;}
}
