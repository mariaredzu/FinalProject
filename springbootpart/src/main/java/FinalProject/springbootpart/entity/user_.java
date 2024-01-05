package FinalProject.springbootpart.entity;

import jakarta.persistence.*;

@Entity
@Table(name="user_")
public class user_ {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="name")
    private String name;

    @Column(name="first_name")
    private String first_name;

    @Column(name="email")
    private String email;

    @OneToOne
    @JoinColumn(name = "user_type_id")
    private usertype usertype;

    public user_() {
    }

    public user_(String name, String first_name, String email) {
        this.name = name;
        this.first_name = first_name;
        this.email = email;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFirstName() {
        return first_name;
    }

    public void setFirstName(String first_name) {
        this.first_name = first_name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public FinalProject.springbootpart.entity.usertype getUsertype() {
        return usertype;
    }

    public void setUsertype(FinalProject.springbootpart.entity.usertype usertype) {
        this.usertype = usertype;
    }

    @Override
    public String toString() {
        return "user_{ id = " + id + ", name = " + name + ", firstName = " + first_name +
                ", email = " + email + ", usertype = " + usertype + " }";
    }
}
