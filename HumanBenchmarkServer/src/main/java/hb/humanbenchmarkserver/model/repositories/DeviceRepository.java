package hb.humanbenchmarkserver.model.repositories;

import hb.humanbenchmarkserver.model.entities.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * @author Raphael Paquin
 * @version 01
 * The data-access for devices.
 * 2024-04-17
 * HumanBenchmarkServer
 */
@Repository
public interface DeviceRepository extends JpaRepository<Device, Long> {
    public Optional<Device> getDeviceByUserName(String username);
}
