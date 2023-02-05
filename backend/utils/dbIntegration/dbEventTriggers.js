import { connect } from "./dbConfig";

const triggers = () => {
  const createFunctionQuery = `
    CREATE OR REPLACE FUNCTION log_changes() RETURNS TRIGGER AS $$
    BEGIN
        IF TG_OP = 'INSERT' THEN
            INSERT INTO changes (change_type, old_data, new_data)
            VALUES ('insert', NULL, NEW.*);

        ELSIF TG_OP = 'UPDATE' THEN
            INSERT INTO changes (change_type, old_data, new_data)
            VALES ('update', OLD.*, NEW.*);

        ELIF TG_OP = 'DELETE' THEN
            INSERT INTO changes (change_type, old_data, new_data)
            VALUES ('delete', OLD.*, NULL);
        END IF;
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
    `;

  const createTriggerQuery = `
    CREATE TRIGGER log_changes_trigger_role
    AFTER INSERT OR UPDATE OR DELETE ON role
    FOR EACH ROW EXECUTE FUNCTION log_changes();

    CREATE TRIGGER log_changes_trigger_person
    AFTER INSERT OR UPDATE OR DELETE ON person
    FOR EACH ROW EXECUTE FUNCTION log_changes();

    CREATE TRIGGER log_changes_trigger_availability
    AFTER INSERT OR UPDATE OR DELETE ON availability
    FOR EACH ROW EXECUTE FUNCTION log_changes();

    CREATE TRIGGER log_changes_trigger_competence
    AFTER INSERT OR UPDATE OR DELETE ON competence
    FOR EACH ROW EXECUTE FUNCTION log_changes();

    CREATE TRIGGER log_changes_trigger_competence_profile
    AFTER INSERT OR UPDATE OR DELETE ON competence_profile
    FOR EACH ROW EXECUTE FUNCTION log_changes();
    `;

  try {
    const client = connect();

    client.query(createFunctionQuery);
    client.query(createTriggerQuery);
  } catch (e) {
    throw e;
  }
};

triggers();
