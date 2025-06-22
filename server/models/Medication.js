// models/MedicationReminder.js
const mongoose = require('mongoose');

const medicationReminderSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    medicationName: {
        type: String,
        required: true
    },
    dosage: {
        amount: { type: String, required: true }, // "2 tablets", "5ml", "1 capsule"
        frequency: { type: String, required: true }, // "twice daily", "every 8 hours", "once daily"
        instructions: { type: String } // "with food", "before meals", "at bedtime"
    },
    schedule: {
        startDate: { type: Date, required: true },
        totalDays: { type: Number, required: true }, // 5 days, 7 days, etc.
        timesPerDay: { type: Number, required: true }, // 1, 2, 3 times per day
        reminderTimes: [{ type: String, required: true }] // ["08:00", "20:00"] for twice daily
    },
    ageGroup: {
        type: String,
        enum: ['child', 'teen', 'adult', 'senior'],
        required: true
    },
    language: {
        type: String,
        default: 'English'
    },
    communicationMethod: {
        type: String,
        enum: ['SMS', 'Voice', 'USSD'],
        default: 'SMS'
    },
    remindersSent: [{
        dayNumber: { type: Number }, // Day 1, 2, 3, etc.
        scheduledTime: { type: String }, // "08:00"
        sentAt: { type: Date },
        method: { type: String, enum: ['SMS', 'Voice', 'USSD'] },
        message: { type: String },
        status: { 
            type: String, 
            enum: ['pending', 'sent', 'delivered', 'failed'],
            default: 'pending'
        },
        patientResponse: { type: String } // "taken", "missed", "delayed"
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    completionStatus: {
        type: String,
        enum: ['ongoing', 'completed', 'discontinued'],
        default: 'ongoing'
    },
    adherenceRate: {
        type: Number,
        default: 0 // Percentage of doses taken on time
    }
}, {
    timestamps: true
});

// Calculate if reminder period is complete
medicationReminderSchema.methods.isReminderPeriodComplete = function() {
    const daysPassed = Math.floor((new Date() - this.schedule.startDate) / (1000 * 60 * 60 * 24));
    return daysPassed >= this.schedule.totalDays;
};

// Get current day number in the medication schedule
medicationReminderSchema.methods.getCurrentDay = function() {
    const daysPassed = Math.floor((new Date() - this.schedule.startDate) / (1000 * 60 * 60 * 24)) + 1;
    return Math.min(daysPassed, this.schedule.totalDays);
};

// Generate age-appropriate reminder messages (Duolingo style)
medicationReminderSchema.methods.generateReminderMessage = function(dayNumber, timeOfDay) {
    const { medicationName, dosage, ageGroup } = this;
    
    const messages = {
        child: {
            morning: [
                `🌟 Good morning! Time for your ${medicationName}! You're doing great! 💪`,
                `🦸‍♀️ Medicine time, superhero! Take your ${dosage.amount} ${medicationName} and stay strong!`,
                `🌈 Rise and shine! Your ${medicationName} is waiting - you've got this! ⭐`,
                `🎯 Day ${dayNumber}: Time for ${medicationName}! You're almost there, champion! 🏆`
            ],
            afternoon: [
                `☀️ Afternoon reminder: ${medicationName} time! You're doing amazing! 🌟`,
                `🚀 Blast off to better health! Take your ${dosage.amount} ${medicationName} now! 💫`,
                `🎨 Creative break time! Don't forget your ${medicationName} - you're artistic AND healthy! 🎭`
            ],
            evening: [
                `🌙 Bedtime medicine time! ${medicationName} will help you sleep better! ✨`,
                `🦉 Hoot hoot! Night owl, time for your ${medicationName}! Sweet dreams ahead! 💤`,
                `⭐ Before you count stars, take your ${dosage.amount} ${medicationName}! Good night! 🌜`
            ]
        },
        teen: {
            morning: [
                `📱 Morning notification: ${medicationName} time! Stay on track! 💪`,
                `🔥 Level up your health! Take ${dosage.amount} ${medicationName} - Day ${dayNumber}! 🎮`,
                `☕ Before your coffee/breakfast - ${medicationName} time! You got this! ⚡`,
                `📚 Fuel for success! ${medicationName} taken = one step closer to feeling awesome! 🌟`
            ],
            afternoon: [
                `📲 Quick reminder: ${medicationName} break! Don't let your health streak end! 🔥`,
                `🎯 Midday mission: Take your ${dosage.amount} ${medicationName}! Achievement unlocked! 🏆`,
                `🌮 Lunch break = medicine break! ${medicationName} time! 🥤`
            ],
            evening: [
                `🌆 Evening check-in: ${medicationName} before you wind down! 📱`,
                `🎵 Before your evening playlist - quick ${medicationName} reminder! 🎧`,
                `🌙 Night routine activated: ${dosage.amount} ${medicationName} ✓ Sweet dreams! 💤`
            ]
        },
        adult: {
            morning: [
                `Good morning! Time for your ${medicationName} (${dosage.amount}). Day ${dayNumber} of ${this.schedule.totalDays}.`,
                `Morning medication reminder: ${medicationName}. Take with ${dosage.instructions || 'water'}.`,
                `Your ${medicationName} is due now. Stay consistent with your treatment! 💊`,
                `Health reminder: ${dosage.amount} ${medicationName}. You're ${Math.round((dayNumber/this.schedule.totalDays)*100)}% through your course!`
            ],
            afternoon: [
                `Afternoon dose: ${medicationName} (${dosage.amount}). Don't miss your scheduled time.`,
                `Medication alert: Time for ${medicationName}. ${dosage.instructions ? dosage.instructions : ''}`,
                `Your health matters: ${medicationName} reminder for optimal recovery.`
            ],
            evening: [
                `Evening medication: ${medicationName} (${dosage.amount}). Almost done for today!`,
                `Before bed routine: Don't forget your ${medicationName}. Rest well!`,
                `Final dose today: ${medicationName}. Consistency leads to recovery! 🌙`
            ]
        },
        senior: {
            morning: [
                `Good morning! Gentle reminder for your ${medicationName} (${dosage.amount}). Have a wonderful day! 🌻`,
                `Daily medication: ${medicationName}. Take with breakfast if recommended. Take care! ☀️`,
                `Morning wellness check: Time for ${medicationName}. You're doing wonderfully! 💚`,
                `Day ${dayNumber}: ${medicationName} with your morning routine. Stay healthy! 🏡`
            ],
            afternoon: [
                `Afternoon reminder: ${medicationName} (${dosage.amount}). Hope you're having a good day! 🌼`,
                `Gentle nudge: Time for ${medicationName}. Your health is important to us! 💝`,
                `Midday medication: ${medicationName}. Remember to take with food if needed. 🍽️`
            ],
            evening: [
                `Evening medication: ${medicationName} (${dosage.amount}). Have a peaceful night! 🌙`,
                `Before you relax: Quick reminder for ${medicationName}. Sleep well! 😌`,
                `Daily care: ${medicationName} for your continued wellness. Good night! ⭐`
            ]
        }
    };

    const timeCategory = this.getTimeCategory(timeOfDay);
    const ageMessages = messages[ageGroup][timeCategory];
    const randomMessage = ageMessages[Math.floor(Math.random() * ageMessages.length)];
    
    return randomMessage;
};

// Determine time of day category
medicationReminderSchema.methods.getTimeCategory = function(time) {
    const hour = parseInt(time.split(':')[0]);
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    return 'evening';
};

// Calculate adherence rate
medicationReminderSchema.methods.calculateAdherence = function() {
    const totalExpectedDoses = this.schedule.totalDays * this.schedule.timesPerDay;
    const takenDoses = this.remindersSent.filter(r => r.patientResponse === 'taken').length;
    this.adherenceRate = Math.round((takenDoses / totalExpectedDoses) * 100);
    return this.adherenceRate;
};

module.exports = mongoose.model("MedicationReminder", medicationReminderSchema);