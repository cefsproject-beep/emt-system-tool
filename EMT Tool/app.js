// Import Firebase - GUNA VERSION INI
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { 
    getFirestore, 
    doc, 
    setDoc 
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// ✅ GUNA FIREBASE CONFIG ANDA
const firebaseConfig = {
  apiKey: "AIzaSyAL5PhLd1pLhppxnZBoZnZWvmsyUQnttOQ",
  authDomain: "emt02-782e1.firebaseapp.com",
  projectId: "emt02-782e1",
  storageBucket: "emt02-782e1.firebasestorage.app",
  messagingSenderId: "791132862958",
  appId: "1:791132862958:web:8630b126f789c772ed76ff"
};

// Initialize Firebase
console.log('🚀 Initializing Firebase...');
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

console.log('✅ Firebase initialized successfully!');

// ✅ SIMPLE FUNCTION - PASTI BOLEH RUN
window.createEMTUser = function() {
    console.log('🎯 Button clicked!');
    
    // Dapatkan values dari form
    const name = document.getElementById('name').value;
    const position = document.getElementById('position').value;
    const emtRole = document.getElementById('emtRole').value;

    console.log('📝 Form values:', { name, position, emtRole });

    // Validation
    if (!name || !position || !emtRole) {
        alert('❌ Sila isi semua maklumat!');
        return;
    }

    // Show loading
    const btn = document.getElementById('createBtn');
    btn.textContent = 'Creating Profile...';
    btn.disabled = true;

    // Create user
    createUser(name, position, emtRole);
};


      
   
// Function untuk create user
async function createUser(name, position, emtRole) {
    try {
        console.log('🔨 Starting user creation...');
        
        // Generate email & password
        const timestamp = Date.now();
        const randomNum = Math.floor(Math.random() * 1000);
        const autoEmail = `emt_${timestamp}_${randomNum}@emt.system`;
        const autoPassword = `password${timestamp}${randomNum}`;

        console.log('📧 Auto credentials:', { autoEmail });
        
        // 1. Create authentication user
        console.log('🔐 Creating auth user...');
        const userCredential = await createUserWithEmailAndPassword(auth, autoEmail, autoPassword);
        const user = userCredential.user;
        
        console.log('✅ Auth user created:', user.uid);

        // 2. Save to Firestore
        console.log('💾 Saving to Firestore...');
        await setDoc(doc(db, 'users', user.uid), {
            name: name,
            position: position,
            emtRole: emtRole,
            email: autoEmail,
            createdAt: new Date()
        });

        console.log('✅ Firestore save successful!');

        // 3. Show success
        alert('✅ Profile created successfully!');
        
        // 4. Show profile
        document.getElementById('userForm').style.display = 'none';
        document.getElementById('userProfile').style.display = 'block';
        document.getElementById('displayName').textContent = name;
        document.getElementById('displayPosition').textContent = position;
        document.getElementById('displayEMTRole').textContent = emtRole;

    } catch (error) {
        console.error('❌ Error:', error);
        alert('Error: ' + error.message);
        
        // Reset button
        const btn = document.getElementById('createBtn');
        btn.textContent = 'Create Profile';
        btn.disabled = false;
    }
}

console.log('🎉 App.js loaded successfully!');