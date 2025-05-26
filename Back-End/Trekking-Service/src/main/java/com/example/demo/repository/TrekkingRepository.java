package com.example.demo.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.Trekking;

public interface TrekkingRepository extends JpaRepository<Trekking, Long>{
	
	List<Trekking> findByOrganizzatoreIdNotAndDataAfter(Long organizzatoreId, LocalDate data);
	
	List<Trekking> findByOrganizzatoreId(Long organizzatoreId);

}
