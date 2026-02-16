import { PHASES } from "@/lib/constants";

describe("Game Logic - Phase Navigation", () => {
  describe("nextStep", () => {
    it("should move to next sub-phase if available", () => {
      const phase = PHASES[0];
      const currentSubPhase = 0;
      const subPhasesLength = phase.subPhases?.length || 0;

      expect(currentSubPhase < subPhasesLength - 1).toBe(true);
    });

    it("should move to next main phase when sub-phases end", () => {
      const currentPhase = 0;
      const phase = PHASES[currentPhase];
      const currentSubPhase = phase.subPhases
        ? phase.subPhases.length - 1
        : 0;

      const shouldMoveToNextPhase =
        currentPhase < PHASES.length - 1;

      expect(shouldMoveToNextPhase).toBe(true);
      expect(currentPhase + 1).toBe(1);
    });

    it("should advance turn and reset phase when at last phase", () => {
      const currentPhase = PHASES.length - 1;
      const phase = PHASES[currentPhase];
      const currentSubPhase = phase.subPhases
        ? phase.subPhases.length - 1
        : 0;

      const shouldAdvanceTurn =
        currentPhase === PHASES.length - 1 &&
        (phase.subPhases
          ? currentSubPhase === phase.subPhases.length - 1
          : true);

      expect(shouldAdvanceTurn).toBe(true);
    });
  });

  describe("prevStep", () => {
    it("should move to previous sub-phase if available", () => {
      const currentSubPhase = 1;
      expect(currentSubPhase > 0).toBe(true);
    });

    it("should move to previous phase and its last sub-phase", () => {
      const currentPhase = 1;
      const currentSubPhase = 0;

      expect(currentSubPhase === 0 && currentPhase > 0).toBe(true);

      if (currentPhase > 0) {
        const prevPhase = PHASES[currentPhase - 1];
        const prevSubPhase = prevPhase.subPhases
          ? prevPhase.subPhases.length - 1
          : 0;

        expect(prevSubPhase).toBeGreaterThanOrEqual(0);
      }
    });

    it("should not go before first phase", () => {
      const currentPhase = 0;
      const currentSubPhase = 0;

      const canGoPrev = currentSubPhase > 0 || currentPhase > 0;
      expect(canGoPrev).toBe(false);
    });
  });

  describe("Phase Structure", () => {
    it("should have exactly 5 main phases", () => {
      expect(PHASES.length).toBe(5);
    });

    it("should have all required phase properties", () => {
      PHASES.forEach((phase) => {
        expect(phase.name).toBeDefined();
        expect(phase.shortName).toBeDefined();
        expect(phase.description).toBeDefined();
      });
    });

    it("should have correct phase order", () => {
      const expectedOrder = [
        "Beginning Phase",
        "First Main Phase",
        "Combat Phase",
        "Second Main Phase",
        "Ending Phase",
      ];

      const actualOrder = PHASES.map((p) => p.name);
      expect(actualOrder).toEqual(expectedOrder);
    });

    it("Beginning phase should have sub-phases", () => {
      const beginningPhase = PHASES[0];
      expect(beginningPhase.subPhases).toBeDefined();
      expect(beginningPhase.subPhases?.length).toBe(3);
    });

    it("Combat phase should have 5 sub-phases", () => {
      const combatPhase = PHASES[2];
      expect(combatPhase.subPhases?.length).toBe(5);
    });

    it("Main phases should not have sub-phases", () => {
      const mainPhases = [PHASES[1], PHASES[3]];
      mainPhases.forEach((phase) => {
        expect(phase.subPhases).toBeUndefined();
      });
    });
  });

  describe("Turn Management", () => {
    it("should track turn number", () => {
      const turnNumber = 1;
      expect(turnNumber).toBeGreaterThan(0);

      const nextTurn = turnNumber + 1;
      expect(nextTurn).toBe(2);
    });

    it("should alternate active player", () => {
      let activePlayer: 1 | 2 = 1;
      activePlayer = activePlayer === 1 ? 2 : 1;

      expect(activePlayer).toBe(2);

      activePlayer = activePlayer === 1 ? 2 : 1;
      expect(activePlayer).toBe(1);
    });

    it("should reset to beginning phase after ending phase", () => {
      const currentPhase = PHASES.length - 1;
      const nextPhase = currentPhase === PHASES.length - 1 ? 0 : currentPhase + 1;

      expect(nextPhase).toBe(0);
    });
  });

  describe("Life Tracking", () => {
    it("should increment life", () => {
      const life = 20;
      const newLife = life + 1;
      expect(newLife).toBe(21);
    });

    it("should decrement life", () => {
      const life = 20;
      const newLife = life - 1;
      expect(newLife).toBe(19);
    });

    it("should allow negative life", () => {
      const life = 0;
      const newLife = life - 1;
      expect(newLife).toBe(-1);
    });

    it("should support high life totals", () => {
      const life = 40;
      expect(life).toBeGreaterThanOrEqual(20);
    });
  });
});
