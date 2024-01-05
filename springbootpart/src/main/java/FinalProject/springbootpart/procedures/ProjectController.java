package FinalProject.springbootpart.procedures;
import FinalProject.springbootpart.entity.user_;
import FinalProject.springbootpart.entity.usertype;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/")
@CrossOrigin(origins = "http://localhost:8080")
public class ProjectController implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:4200")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*");
    }

    private final UserRepo userRepo;
    private final UserTypeRepo userTypeRepo;

    @Autowired
    public ProjectController(@Qualifier("userRepo") UserRepo userRepo, @Qualifier("userTypeRepo") UserTypeRepo userTypeRepo) {
        this.userRepo = userRepo;
        this.userTypeRepo = userTypeRepo;
    }

    @GetMapping("/users")
    public List<user_> listAllUsers() {
        return userRepo.findAll();
    }

    @PostMapping("/createus")
    public ResponseEntity<String> createUser(@RequestBody user_ userFormData) {

        try {
            user_ user = new user_();
            user.setName(userFormData.getName());
            user.setFirstName(userFormData.getFirstName());
            user.setEmail(userFormData.getEmail());
            user.setUsertype(userFormData.getUsertype());

            userRepo.save(user);

            return ResponseEntity.ok("User created successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating user: " + e.getMessage());
        }
    }

    @PutMapping("/updateus/{userId}")
    public ResponseEntity<Void> updateUser(@PathVariable Integer userId, @RequestBody user_ updatedUser) {
        Optional<user_> existingUserOptional = userRepo.findById(userId);

        if (existingUserOptional.isPresent()) {
            user_ existingUser = existingUserOptional.get();
            existingUser.setName(updatedUser.getName());
            existingUser.setFirstName(updatedUser.getFirstName());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setUsertype(updatedUser.getUsertype());

            userRepo.save(existingUser);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/removeus/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable int userId) {
        userRepo.deleteById(userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/typeusers")
    public List<usertype> listAllTypeUsers() {
        return userTypeRepo.findAll();
    }

    @PostMapping("/createty")
    public ResponseEntity<String> createType(@RequestBody usertype userTypeFormData) {
        System.out.println(userTypeFormData);
        try {
            usertype UserType = new usertype();
            UserType.setType_name(userTypeFormData.getType_name());

            userTypeRepo.save(UserType);

            return ResponseEntity.ok("User type created successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating user type: " + e.getMessage());
        }
    }

    @PutMapping("/updatety/{userId}")
    public ResponseEntity<usertype> updateType(@PathVariable Integer userId, @RequestBody usertype updatedUserType) {
        Optional<usertype> existingUserOptional = userTypeRepo.findById(userId);

        if (existingUserOptional.isPresent()) {
            usertype existingUserType = existingUserOptional.get();
            existingUserType.setType_name(updatedUserType.getType_name());

            usertype savedUserType = userTypeRepo.save(existingUserType);
            return ResponseEntity.ok(savedUserType);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/removety/{userId}")
    public ResponseEntity<Void> deleteType(@PathVariable int userId) {
        System.out.println(userId);
        userTypeRepo.deleteById(userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}










