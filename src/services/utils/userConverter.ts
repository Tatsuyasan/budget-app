import User from '@/models/User';

// Firestore data converter
export const userConverter = {
  toFirestore: function(user: User) {
    return {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
    };
  },
  fromFirestore: function(snapshot: any, options: any) {
    const data = snapshot.data(options);
    return new User(data.id, data.firstname, data.lastname);
  },
};
