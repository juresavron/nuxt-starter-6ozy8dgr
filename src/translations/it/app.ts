export const app = {
  name: 'ocenagor.si',
  description: 'Aiutiamo le aziende a crescere attraverso il feedback dei clienti',
  loggedIn: 'Sei connesso',
  signOut: 'Disconnetti',
  loading: 'Caricamento...',
  notFound: {
    title: 'Pagina non trovata',
    message: 'Ci dispiace, non siamo riusciti a trovare la pagina che stai cercando.',
    backHome: 'Torna alla Home',
    tryAgain: 'Riprova'
  },
  error: {
    title: 'Qualcosa è andato storto',
    message: 'Si prega di aggiornare la pagina e riprovare.',
    retry: 'Riprova',
    back: 'Torna alla panoramica'
  },
  companyIdNotFound: 'ID azienda non trovato',
  companyIdNotFoundMessage: 'L\'ID azienda fornito non è valido o non esiste nel nostro sistema.',
  auth: {
    sessionExpired: 'La tua sessione è scaduta. Effettua nuovamente il login.',
    loginRequired: 'Per favore effettua il login per continuare.'
  },
  payment: {
    checkoutFailed: 'Impossibile creare la sessione di checkout. Riprova più tardi.',
    processingPayment: 'Elaborazione del pagamento...'
  },
  subscriptions: {
    manageSubscription: 'Gestisci abbonamento',
    cancel: 'Cancella abbonamento',
    keepSubscription: 'Mantieni abbonamento',
    cancelWarning: {
      title: 'Informazioni importanti',
      message: 'L\'accesso a tutte le funzionalità continuerà fino alla fine del periodo di fatturazione corrente.'
    },
    cancelImmediateWarning: {
      title: 'Attenzione: Cancellazione immediata',
      message: 'Questa azione non può essere annullata. L\'utente perderà immediatamente l\'accesso e non verrà emesso alcun rimborso.'
    },
    cancelImmediate: 'Cancellazione immediata dell\'abbonamento',
    cancel_reason: 'Motivo della cancellazione (facoltativo)',
    cancel_reason_placeholder: 'Per favore, dicci perché stai cancellando...',
    cancelling: 'Cancellazione...',
    confirmCancellation: 'Conferma cancellazione',
    superadminAccount: 'Account Superadmin',
    fullAccess: 'Come superadmin hai accesso a tutte le funzionalità senza bisogno di un abbonamento.'
  }
};

export default app;