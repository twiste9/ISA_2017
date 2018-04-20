package com.reservationapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.reservationapp.model.Event;
import com.reservationapp.model.Reservation;
import com.reservationapp.model.Seat;

public interface ReservationRepository extends JpaRepository<Reservation, Long>{

	public Reservation findBySeat(@Param("seat")Seat seat);
	
	public List<Reservation> findByEvent(Event event);
}
