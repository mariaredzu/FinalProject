package FinalProject.springbootpart.entity;

import jakarta.persistence.*;

@Entity
@Table(name="usertype")
public class usertype {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="type_name")
    private String type_name;

    public usertype () {
    }

    public usertype (String type_name) {
        this.type_name = type_name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getType_name() {
        return type_name;
    }

    public void setType_name(String type_name) {
        this.type_name = type_name;
    }

    @Override
    public String toString() {
        return "usertype{ id = " + id + ", type_name = " + type_name + " }";
    }
}

