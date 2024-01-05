package FinalProject.springbootpart.procedures;

import FinalProject.springbootpart.entity.usertype;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserTypeRepo extends JpaRepository<usertype, Integer> {
}
