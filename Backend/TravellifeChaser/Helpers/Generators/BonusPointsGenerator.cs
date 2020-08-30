using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TravellifeChaser.Models.AirlinesSystem.Enums;

namespace TravellifeChaser.Helpers.Generators
{
    public class BonusPointsGenerator
    {
        public static int GetBonusPoints(double distance)
        {
            int bonusPoints = 0;
            if (distance <= 100)
                bonusPoints = 5;
            else if (distance <= 400)
                bonusPoints = 10;
            else if (distance <= 700)
                bonusPoints = 15;
            else
                bonusPoints = 20;

            return bonusPoints;
        }

        public static double GetCostWithDiscount(int bonusPoints, double economyCost, AirplaneClass airplaneClass)
        { 
            int percentageClass = GetRiseBasedOnClass(airplaneClass);
            double factor1 = ((double)percentageClass) / 100;
            double factor2 = ((double)bonusPoints) / 100;
            double costWithoutBonusPoints = economyCost + economyCost * factor1;
            return costWithoutBonusPoints - costWithoutBonusPoints * factor2;
        }

        private static int GetRiseBasedOnClass(AirplaneClass airplaneClass)
        {
            int percentageByClass;
            switch (airplaneClass)
            {
                case AirplaneClass.None:
                    percentageByClass = 0;
                    break;
                case AirplaneClass.Economy:
                    percentageByClass = 0;
                    break;
                case AirplaneClass.Business:
                    percentageByClass = 10;
                    break;
                case AirplaneClass.First:
                    percentageByClass = 25;
                    break;
                default:
                    percentageByClass = 0;
                    break;
            }

            return percentageByClass;
        }
    }
}
