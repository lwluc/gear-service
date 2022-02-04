package com.gearservice.model.cheque.samples;

/**
 * Enum Comments contains samples of comments
 *
 * @version 1.0
 * @author Dmitry
 * @since 04.09.2015
 */
public enum Comments {
    comment1("Dies ist ein Test"),
    comment2("Dies ist ein weiterer Test");

    private final String comment;
    Comments(String s) {comment = s;}
    public boolean equalsName(String otherComment) {return (otherComment != null) && comment.equals(otherComment);}
    public String toString() {return this.comment;}
}
