const { Pool } = require('pg');
require('dotenv').config({ path: '../.env' });

// Connect to the database
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});

console.log("DATABASE_URL = ", process.env.DATABASE_URL);

(async () => {
    try {
        // Insert sample data into `users` table
        console.log("Seeding users...");
        await pool.query(`
            INSERT INTO users (user_email, user_password_hash, user_role, user_first_name, user_last_name, user_birth_date)
            VALUES
                ('ajay.kumar@example.com', 'hashedpassword123', 'patient', 'Ajay', 'Kumar', '1990-02-15'),
                ('priya.sharma@example.com', 'hashedpassword456', 'doctor', 'Priya', 'Sharma', '1985-11-30'),
                ('rahul.rai@example.com', 'hashedpassword789', 'doctor', 'Rahul', 'Rai', '1980-07-10'),
                ('sunita.patil@example.com', 'hashedpassword101', 'patient', 'Sunita', 'Patil', '1992-04-22')
            ON CONFLICT (user_email) DO NOTHING;
        `);

        // Insert sample data into `doctor` table
        console.log("Seeding doctors...");
        await pool.query(`
            INSERT INTO doctor (doctor_user_id_reference, doctor_country, doctor_city, doctor_specialization, doctor_account_state)
            VALUES
                (2, 'India', 'Delhi', 'Cardiologist', 'Active'),
                (3, 'India', 'Mumbai', 'Orthopedic Surgeon', 'Active')
            ON CONFLICT (doctor_user_id_reference) DO NOTHING;
        `);

        // Insert sample data into `patient` table
        console.log("Seeding patients...");
        await pool.query(`
            INSERT INTO patient (patient_user_id_reference, patient_wallet, patient_account_state)
            VALUES
                (1, 5000, 'Active'),
                (4, 3000, 'Active')
            ON CONFLICT (patient_user_id_reference) DO NOTHING;
        `);

        // Insert sample data into `doctor_availability` table
        console.log("Seeding doctor availability...");
        await pool.query(`
            INSERT INTO doctor_availability (doctor_availability_doctor_id, doctor_availability_day_hour, doctor_availability_type, doctor_availability_status)
            VALUES
                (2, '2023-11-20 10:00:00'::timestamptz, 'Consultation', 'Available'),
                (3, '2023-11-20 11:00:00'::timestamptz, 'Consultation', 'Available')
            ON CONFLICT (doctor_availability_id) DO NOTHING;
        `);

        // Insert sample data into `doctor_education` table
        console.log("Seeding doctor education...");
        await pool.query(`
            INSERT INTO doctor_education (education_doctor_id, education_certificate, education_authority, education_start_date, education_end_date)
            VALUES
                (2, 'MBBS, MD in Cardiology', 'All India Institute of Medical Sciences (AIIMS)', '2005-06-01', '2011-05-15'),
                (3, 'MBBS, MS in Orthopedics', 'King Edward Memorial Hospital', '2003-08-01', '2008-07-20')
            ON CONFLICT (doctor_education_id) DO NOTHING;
        `);

        // Insert sample data into `doctor_experience` table
        console.log("Seeding doctor experience...");
        await pool.query(`
            INSERT INTO doctor_experience (doctor_experience_doctor_id, doctor_experience_job_title, doctor_experience_firm_name, doctor_experience_department, doctor_experience_start_date, doctor_experience_end_date)
            VALUES
                (2, 'Senior Cardiologist', 'Medanta Hospital', 'Cardiology', '2011-06-01', '2023-10-01'),
                (3, 'Consulting Orthopedic Surgeon', 'Mumbai General Hospital', 'Orthopedics', '2008-08-01', '2023-10-01')
            ON CONFLICT (doctor_experience_id) DO NOTHING;
        `);

        // Insert sample data into `doctor_interest` table
        console.log("Seeding doctor interests...");
        await pool.query(`
            INSERT INTO doctor_interest (doctor_interest_doctor_id, doctor_interest_name, doctor_interest_category)
            VALUES
                (2, 'Heart Health Awareness', 'Cardiology'),
                (3, 'Sports Injuries', 'Orthopedics')
            ON CONFLICT (doctor_interest_id) DO NOTHING;
        `);

        // Insert sample data into `appointment` table
        console.log("Seeding appointments...");
        await pool.query(`
            INSERT INTO appointment (appointment_patient_id, appointment_doctor_id, appointment_availability_slot, appointment_type, appointment_duration)
            VALUES
                (1, 2, 1, 'Consultation', 30),
                (4, 3, 2, 'Consultation', 45)
            ON CONFLICT (appointment_id) DO NOTHING;
        `);

        // Insert sample data into `appointment_results` table
        console.log("Seeding appointment results...");
        await pool.query(`
            INSERT INTO appointment_results (results_appointment_reference, appointment_diagnosis, appointment_report)
            VALUES
                (1, 'Normal heart condition', 'No abnormalities detected'),
                (2, 'Knee injury', 'MRI scan shows mild ligament tear')
            ON CONFLICT (results_appointment_reference) DO NOTHING;
        `);

        // Insert sample data into `appointment_review` table
        console.log("Seeding appointment reviews...");
        await pool.query(`
            INSERT INTO appointment_review (appointment_review_appointment_id, appointment_review_communication_rating, appointment_review_understanding_rating, appointment_review_providing_solutions_rating, appointment_review_commitment_rating)
            VALUES
                (1, 4, 5, 4, 5),
                (2, 5, 4, 5, 5)
            ON CONFLICT (appointment_review_id) DO NOTHING;
        `);

        // Insert sample data into `treatment_plan` table
        console.log("Seeding treatment plans...");
        await pool.query(`
            INSERT INTO treatment_plan (treatment_plan_appointment_reference, treatment_plan_operations, treatment_plan_speciality_referral, treatment_plan_referral_notes)
            VALUES
                (1, 'Follow-up consultation recommended', 'Cardiology', 'Patient needs regular heart check-ups'),
                (2, 'Knee strengthening exercises prescribed', 'Orthopedics', 'Patient referred to physiotherapy')
            ON CONFLICT (treatment_plan_id) DO NOTHING;
        `);

        // Insert sample data into `medications` table
        console.log("Seeding medications...");
        await pool.query(`
            INSERT INTO medications (medication_treatment_plan_reference, medication_plan_name, medication_plan_dosage, medication_plan_note, medication_plan_start_date, medication_plan_end_date)
            VALUES
                (1, 'Aspirin', '75 mg daily', 'For heart health', '2023-10-01', '2024-10-01'),
                (2, 'Ibuprofen', '400 mg daily', 'For pain relief', '2023-10-01', '2023-11-01')
            ON CONFLICT (medication_id) DO NOTHING;
        `);

        // Insert sample data into `medical_documents` table
        console.log("Seeding medical documents...");
        await pool.query(`
            INSERT INTO medical_documents (medical_document_appointment_reference, medical_document_treatment_plan_reference, medical_document_data, medical_document_request_note, medical_document_type, medical_document_name)
            VALUES
                (1, 1, NULL, 'Heart disease checkup results', 'Cardiology Report', 'Heart Checkup Report'),
                (2, 2, NULL, 'Knee injury diagnosis report', 'Orthopedic Report', 'MRI Scan Report')
            ON CONFLICT (medical_document_id) DO NOTHING;
        `);

        // Insert sample data into `languages` table
        console.log("Seeding languages...");
        await pool.query(`
            INSERT INTO languages (lang_user_id, language)
            VALUES
                (1, 'Hindi'),
                (2, 'English'),
                (3, 'Marathi'),
                (4, 'Gujarati')
            ON CONFLICT (language_id) DO NOTHING;
        `);

        console.log("Seeding completed successfully.");
    } catch (error) {
        console.error("Error seeding the database:", error.stack);
    } finally {
        pool.end();
    }
})();
