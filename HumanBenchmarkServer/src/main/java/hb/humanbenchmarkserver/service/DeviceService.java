package hb.humanbenchmarkserver.service;

import hb.humanbenchmarkserver.model.entities.Device;
import hb.humanbenchmarkserver.model.repositories.DeviceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * @author Raphael Paquin
 * @version 01
 * The device service.
 * 2024-04-23
 * HumanBenchmarkServer
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class DeviceService {

    private final DeviceRepository deviceRepository;
    private final SessionService sessionService;

    public Boolean doesDeviceExist(String deviceName) {
        return deviceRepository.existsByUserName(deviceName);
    }

    public Boolean doesDeviceExist(int deviceID) {
        return deviceRepository.existsById((long) deviceID);
    }

    public Device getDeviceOrDefault(long deviceID) {
        return deviceRepository.getReferenceById(deviceID);
    }

    public Device getDeviceOrDefault(String deviceName) {
        Optional<Device> deviceOptional = deviceRepository.getDeviceByUserName(deviceName);
        return deviceOptional.orElse(null);
    }

    public Device save(Device device) {
        return deviceRepository.save(device);
    }
}
