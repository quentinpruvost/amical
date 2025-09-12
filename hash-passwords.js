// hash-passwords.js
import bcrypt from 'bcrypt';

const nonModifiablePassword = 'Rjnwyohp!'; // <-- Changez ceci
const modifiablePassword = 'amicalech'; // <-- Changez ceci
const saltRounds = 10;

async function hashAndLog() {
    try {
        const hash1 = await bcrypt.hash(nonModifiablePassword, saltRounds);
        console.log('-- Copiez et exécutez ce code SQL dans votre base de données Neon :');
        console.log(
            `INSERT INTO users (username, password_hash, is_modifiable) VALUES ('admin_fixe', '${hash1}', false);`
        );

        const hash2 = await bcrypt.hash(modifiablePassword, saltRounds);
        console.log(
            `INSERT INTO users (username, password_hash, is_modifiable) VALUES ('admin_modifiable', '${hash2}', true);`
        );
        console.log('-- Fin du code SQL.');
    } catch (err) {
        console.error('Erreur lors du hachage :', err);
    }
}

hashAndLog();