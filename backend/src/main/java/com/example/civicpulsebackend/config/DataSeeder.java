package com.example.civicpulsebackend.config;

import com.example.civicpulsebackend.citizen.entity.*;
import com.example.civicpulsebackend.citizen.repository.*;
import com.example.civicpulsebackend.governance.entity.*;
import com.example.civicpulsebackend.governance.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Configuration
public class DataSeeder {
    @Bean
    CommandLineRunner seed(CitizenRepository citizens, DepartmentRepository departments, GrievanceRepository grievances,
                           ServiceRequestRepository services, CitizenFeedbackRepository feedback,
                           RevenueTransactionRepository revenue, BudgetAllocationRepository budgets,
                           AuditLogRepository audit) {
        return args -> {
            if (departments.count() == 0) {
                departments.saveAll(List.of(
                    dept("Revenue Department","REV","Anita Rao"),
                    dept("Water & Utilities","WAT","Suresh Menon"),
                    dept("Public Works","PWD","Vikram Singh"),
                    dept("Sanitation","SAN","Meena Das"),
                    dept("Licensing","LIC","Arjun Nair")
                ));
            }
            if (citizens.count() == 0) {
                for(int i=1;i<=40;i++) citizens.save(cit("Citizen "+i, "+91 90000 "+String.format("%05d",i), "citizen"+i+"@example.gov"));
            }
            if (services.count() == 0) {
                String[] deps={"Revenue Department","Water & Utilities","Public Works","Sanitation","Licensing"};
                String[] types={"Property Tax Certificate","New Water Connection","Road Repair Request","Waste Pickup","Trade License"};
                String[] statuses={"Resolved","Resolved","In Progress","Approved","Pending"};
                for(int i=1;i<=120;i++){
                    ServiceRequest s=new ServiceRequest(); s.setReferenceNo("SRV-2026-"+String.format("%04d",i));
                    s.setCitizenName("Citizen "+((i%40)+1)); s.setDepartment(deps[i%deps.length]); s.setServiceType(types[i%types.length]);
                    s.setStatus(statuses[i%statuses.length]); s.setSlaDays((i%8)+3); s.setProcessingDays(Math.max(1,(i%(s.getSlaDays()+2))));
                    s.setCreatedAt(LocalDateTime.now().minusDays(i%160)); services.save(s);
                }
            }
            if (grievances.count() == 0) {
                String[] deps={"Revenue Department","Water & Utilities","Public Works","Sanitation","Licensing"};
                String[] cats={"Property Tax","Water Supply","Street Light","Waste Management","License"};
                String[] sts={"Resolved","Resolved","In Progress","Pending","Escalated"};
                for(int i=1;i<=60;i++){
                    Grievance g=new Grievance(); g.setReferenceNo("GRV-2026-"+String.format("%04d",i)); g.setCitizenName("Citizen "+((i%40)+1));
                    g.setDepartment(deps[i%deps.length]); g.setCategory(cats[i%cats.length]); g.setPriority(i%7==0?"Critical":(i%3==0?"High":"Medium"));
                    g.setDescription("Citizen service issue recorded through the governance portal."); g.setStatus(sts[i%sts.length]); g.setSlaDays(3+(i%5)); g.setCreatedAt(LocalDateTime.now().minusDays(i%90)); grievances.save(g);
                }
            }
            if (feedback.count() == 0) {
                String[] deps={"Revenue Department","Water & Utilities","Public Works","Sanitation","Licensing"};
                for(int i=1;i<=80;i++){ CitizenFeedback f=new CitizenFeedback(); f.setCitizenName("Citizen "+((i%40)+1)); f.setDepartment(deps[i%deps.length]); f.setServiceType("Public Service"); f.setRating(3.5+(i%16)/10.0); f.setComment("Service feedback"); f.setSubmittedAt(LocalDateTime.now().minusDays(i%120)); feedback.save(f); }
            }
            if (revenue.count() == 0) {
                String[] sources={"Property Tax","Service Fees","License Fees","Water Charges","Fines"};
                for(int i=1;i<=30;i++){ RevenueTransaction r=new RevenueTransaction(); r.setReceiptNo("PAY-2026-"+String.format("%04d",i)); r.setSource(sources[i%sources.length]); r.setDepartment(i%2==0?"Revenue Department":"Water & Utilities"); r.setAmount(150000+(i*23000)); r.setPaymentDate(LocalDate.now().minusDays(i*3L)); r.setStatus("Success"); revenue.save(r); }
            }
            if (budgets.count() == 0) {
                budgets.saveAll(List.of(
                    budget("Roads",15000000,13200000),budget("Water",12000000,10800000),
                    budget("Health",10000000,8200000),budget("Sanitation",8000000,7300000)
                ));
            }
            if (audit.count() == 0) {
                audit.saveAll(List.of(
                    log("Admin Officer","Approved service request","Services","SRV-2026-0104"),
                    log("Revenue Officer","Recorded payment","Finance","PAY-2026-0018"),
                    log("Grievance Officer","Escalated grievance","Grievances","GRV-2026-0047"),
                    log("Admin Officer","Generated compliance report","Reports","RPT-2026-0008")
                ));
            }
        };
    }
    private Department dept(String n,String c,String h){Department d=new Department();d.setName(n);d.setCode(c);d.setHead(h);d.setStatus("Active");return d;}
    private Citizen cit(String n,String p,String e){Citizen c=new Citizen();c.setName(n);c.setPhone(p);c.setEmail(e);c.setStatus("Active");return c;}
    private BudgetAllocation budget(String d,double a,double u){BudgetAllocation b=new BudgetAllocation();b.setDepartment(d);b.setAllocated(a);b.setUtilized(u);b.setFinancialYear("2026-27");return b;}
    private AuditLog log(String a,String ac,String m,String ref){AuditLog l=new AuditLog();l.setActor(a);l.setAction(ac);l.setModuleName(m);l.setEntityRef(ref);l.setOutcome("Success");return l;}
}