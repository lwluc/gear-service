package com.gearservice.model.cheque.samples;

/**
 * Enum Kits contains samples of kits
 *
 * @version 1.0
 * @author Dmitry
 * @since 04.09.2015
 */
public enum Kits {
    kit1("Test");

    private final String kit;
    Kits(String s) {kit = s;}
    public boolean equalsName(String otherKit) {return (otherKit != null) && kit.equals(otherKit);}
    public String toString() {return this.kit;}
}
