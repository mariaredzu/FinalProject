package FinalProject.springbootpart.procedures;

import FinalProject.springbootpart.entity.user_;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<user_, Integer> {
}
