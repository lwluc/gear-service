package com.gearservice.model.cheque.samples;

/**
 * Enum Names contains samples of names
 *
 * @version 1.0
 * @author Dmitry
 * @since 04.09.2015
 */
public enum Names {
    name1("Max Mustermann"),
    name2("Petra Müller");


    private final String name;
    Names(String s) {name = s;}
    public boolean equalsName(String otherName) {return (otherName != null) && name.equals(otherName);}
    public String toString() {return this.name;}
}
