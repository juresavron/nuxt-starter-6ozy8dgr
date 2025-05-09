// Slovenian translations for authentication components
export const auth = {
  signIn: {
    title: 'Prijava',
    subtitle: 'Prijavite se s svojim računom',
    email: 'E-poštni naslov',
    emailPlaceholder: 'Vnesite svoj e-poštni naslov',
    password: 'Geslo',
    passwordPlaceholder: 'Vnesite svoje geslo',
    show: 'Prikaži',
    forgotPassword: 'Ste pozabili geslo?',
    signInButton: 'Prijava',
    noAccount: 'Nimate računa?',
    createAccount: 'Ustvarite račun',
    backToHome: 'Nazaj na domačo stran',
    error: {
      invalidCredentials: 'Neveljavni podatki za prijavo',
      emailRequired: 'E-poštni naslov je obvezen',
      passwordRequired: 'Geslo je obvezno',
      general: 'Prišlo je do napake pri prijavi. Poskusite znova.'
    }
  },
  signUp: {
    title: 'Registracija',
    subtitle: 'Ustvarite nov račun',
    email: 'E-poštni naslov',
    emailPlaceholder: 'Vnesite svoj e-poštni naslov',
    password: 'Geslo',
    passwordPlaceholder: 'Vnesite svoje geslo',
    confirmPassword: 'Potrdite geslo',
    confirmPasswordPlaceholder: 'Ponovno vnesite svoje geslo',
    show: 'Prikaži',
    signUpButton: 'Registracija',
    haveAccount: 'Že imate račun?',
    signIn: 'Prijava',
    backToHome: 'Nazaj na domačo stran',
    error: {
      emailRequired: 'E-poštni naslov je obvezen',
      invalidEmail: 'Vnesite veljaven e-poštni naslov',
      passwordRequired: 'Geslo je obvezno',
      passwordTooShort: 'Geslo mora vsebovati vsaj 8 znakov',
      passwordsDoNotMatch: 'Gesli se ne ujemata',
      general: 'Prišlo je do napake pri registraciji. Poskusite znova.'
    }
  },
  forgotPassword: {
    title: 'Ponastavitev gesla',
    subtitle: 'Vnesite svoj e-poštni naslov za ponastavitev gesla',
    email: 'E-poštni naslov',
    emailPlaceholder: 'Vnesite svoj e-poštni naslov',
    resetButton: 'Pošlji povezavo za ponastavitev',
    backToSignIn: 'Nazaj na prijavo',
    success: 'Povezava za ponastavitev gesla je bila poslana na vaš e-poštni naslov',
    error: {
      emailRequired: 'E-poštni naslov je obvezen',
      invalidEmail: 'Vnesite veljaven e-poštni naslov',
      general: 'Prišlo je do napake pri pošiljanju povezave za ponastavitev. Poskusite znova.'
    }
  }
};

export default auth;