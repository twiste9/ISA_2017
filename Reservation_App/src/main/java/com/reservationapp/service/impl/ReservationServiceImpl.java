package com.reservationapp.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.reservationapp.model.Event;
import com.reservationapp.model.Hall;
import com.reservationapp.model.Institution;
import com.reservationapp.model.Reservation;
import com.reservationapp.model.Seat;
import com.reservationapp.model.User;
import com.reservationapp.repository.ReservationRepository;
import com.reservationapp.service.ReservationService;


@Service
@Transactional(readOnly = true)
public class ReservationServiceImpl implements ReservationService{

	@Autowired
	private ReservationRepository reservationRepository;
	
	@Autowired
	private InstitutionServiceImpl institutionService;
	
	@Autowired
	private HallServiceImpl hallService;
	
	@Autowired
	private SeatServiceImpl seatService;
	
	@Autowired
	private EventServiceImpl eventService;


	@Override
	public Reservation findOne(Long id) {
		return reservationRepository.findById(id).get();
	}
	
	@Override
	public List<Reservation> findAll() {
		return reservationRepository.findAll();
	}

	@Override
	@Transactional(readOnly = false)
	public Reservation save(Reservation reservation) {
		return reservationRepository.save(reservation);
	}

	@Override
	@Transactional(readOnly = false)
	public List<Reservation> save(List<Reservation> reservation) {
		return reservationRepository.saveAll(reservation);
	}

	@Override
	@Transactional(readOnly = false, propagation = Propagation.REQUIRES_NEW)
	public Reservation delete(Long id) {
		Reservation reservation = reservationRepository.findById(id).get();
		if(reservation == null){
			throw new IllegalArgumentException("Tried to delete"
					+ "non-existant user");
		}
		reservationRepository.delete(reservation);
		return reservation;
	}

	@Override
	@Transactional(readOnly = false, propagation = Propagation.REQUIRES_NEW)
	public void delete(List<Long> ids) {
		for(Long id : ids){
			this.delete(id);
		}
	}

	@Override
	public List<Reservation> findByInstitution(Long id) {
		Institution institution = institutionService.findOne(id);
		List<Hall> halls = hallService.findByInstitution(institution);
		List<Reservation> reservations = new ArrayList<Reservation>();
		for(Hall h : halls) {
			for(Seat s : seatService.findByHall(h)) {
				List<Reservation> reservationTemp = reservationRepository.findBySeat(s);
				for(Reservation r : reservationTemp){
					if(r != null && r.getUser() == null) {
						reservations.add(r);	
					}
				}
			}
		}
		return reservations;
	}

	public List<Reservation> findByEvent(Event event) {
		return reservationRepository.findByEvent(event);
	}

	@Override
	public List<Reservation> searchBetweenDates(Date fromDate, Date toDate) {
		List<Event> events = eventService.findByDateBetween(fromDate, toDate);
		List<Reservation> reservations = new ArrayList<Reservation>();
		for(Event e : events){
			for(Reservation r: reservationRepository.findByEvent(e)){
				reservations.add(r);
			}
		}
		return reservations;
	}

	public List<Reservation> findByUser(User user) {
		return reservationRepository.findByUser(user);
	}

}
